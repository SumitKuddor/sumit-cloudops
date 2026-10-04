import json, os, time, boto3
table = boto3.resource('dynamodb').Table(os.environ['TABLE'])
def resp(code, body):
    return {'statusCode': code, 'headers': {'Content-Type': 'application/json'}, 'body': json.dumps(body)}
def handler(event, _ctx):
    method = event['requestContext']['http']['method']; path = event['rawPath']
    if method == 'POST' and path == '/visit':   # anonymous counter: no IP, no identity stored
        table.update_item(Key={'pk': 'STATS'}, UpdateExpression='ADD visits :one', ExpressionAttributeValues={':one': 1})
        return resp(200, {'ok': True})
    if method == 'GET' and path == '/stats':
        i = table.get_item(Key={'pk': 'STATS'}).get('Item', {})
        n, total = int(i.get('ratingCount', 0)), int(i.get('ratingSum', 0))
        return resp(200, {'visits': int(i.get('visits', 0)), 'ratingCount': n, 'ratingAvg': round(total / n, 2) if n else 0})
    if method == 'POST' and path == '/feedback':
        try: b = json.loads(event.get('body') or '{}')
        except ValueError: return resp(400, {'error': 'bad json'})
        r = b.get('rating')
        if b.get('website') or not isinstance(r, int) or not 1 <= r <= 5: return resp(400, {'error': 'invalid'})
        ts = int(time.time() * 1000)
        table.put_item(Item={'pk': f'FB#{ts}', 'ts': ts, 'rating': r, 'feel': str(b.get('feel', ''))[:40], 'improve': str(b.get('improve', ''))[:1000], 'name': str(b.get('name', ''))[:80]})
        table.update_item(Key={'pk': 'STATS'}, UpdateExpression='ADD ratingSum :r, ratingCount :one', ExpressionAttributeValues={':r': r, ':one': 1})
        return resp(200, {'ok': True})
    return resp(404, {'error': 'not found'})
