const test = require('tape')
const sinon = require('sinon')
const { sanitizeBody } = require('./sanitize-input')

test('sanitizeBody() sanitizes all body paramaters', (t) => {
  const body = {
    noSQL: { '$gt': '' },
    html: '<div onclick="Entity.save(e);" ><a href="/dir/route"onmouseover=$.get("//evil.site/");"?id=80">EVIL</a></div>',
    javascript: '<script>destroyWebsite();</script>'
  }

  const req = { body }
  const res = {}
  const next = sinon.spy()

  sanitizeBody(req, res, next)

  const expected = {
    noSQL: '[object Object]',
    html: '&lt;div onclick=&quot;Entity.save(e);&quot; &gt;&lt;a href=&quot;/dir/route&quot;onmouseover=$.get(&quot;//evil.site/&quot;);&quot;?id=80&quot;&gt;EVIL&lt;/a&gt;&lt;/div&gt;',
    javascript: '&lt;script&gt;destroyWebsite();&lt;/script&gt;'
  }

  t.deepEqual(req.body, expected, 'sanitizes all body paramaters')
  t.equal(next.called, true, 'calls next()')
  t.end()
})
