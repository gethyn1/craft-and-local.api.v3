const test = require('tape')
const sinon = require('sinon')
const { sanitizeObj, sanitizeNoSql, sanitizeKeys, filterIllegalTypes, escapeObj, sanitizeInput } = require('./sanitize-input')

test('sanitizeNoSql() removes NOSQL characters from string', (t) => {
  const result = sanitizeNoSql('$some$.key.of$min.e')
  const expected = 'somekeyofmine'
  t.equal(result, expected, 'removes NOSQL characters from string')
  t.end()
})

test('sanitizeKeys() removes noSQL characters from object keys', (t) => {
  const obj = {
    '$where': 'badthing',
    'db.myCollection.find': 'goingtohappen'
  }

  const result = sanitizeKeys(obj)

  const expected = {
    'where': 'badthing',
    'dbmyCollectionfind': 'goingtohappen'
  }

  t.deepEqual(result, expected, 'removes noSQL characters from object keys')
  t.end()
})

test('sanitizeObj() removes noSQL characters from nested object keys', (t) => {
  const body = {
    '$where': 'badthing',
    'nested': {
      '$where': 'badthing',
      'db.myCollection.find': 'goingtohappen',
      'more': {
        '$where': 'badnesting'
      }
    }
  }

  const result = sanitizeObj(body)

  const expected = {
    'where': 'badthing',
    'nested': {
      'where': 'badthing',
      'dbmyCollectionfind': 'goingtohappen',
      'more': {
        'where': 'badnesting'
      }
    }
  }

  t.deepEqual(result, expected, 'removes noSQL characters from nested object keys')
  t.end()
})

test('filterIllegalTypes() removes illegal types', (t) => {
  const obj = {
    function: () => {},
    number: 23,
    string: 'a string',
    object: { some: 'object' },
    array: [1, 2, 3]
  }

  const expected = {
    number: 23,
    string: 'a string',
    object: { some: 'object' },
    array: [1, 2, 3]
  }

  const result = filterIllegalTypes(obj)

  t.deepEqual(result, expected, 'removes illegal types')
  t.end()
})

test('filterIllegalTypes() removes illegal types from nested iterables', (t) => {
  const obj = {
    nested: {
      function: () => {},
      string: 'a string'
    },
    array: [1, () => {}, 3]
  }

  const expected = {
    nested: {
      string: 'a string'
    },
    array: [1, 3]
  }

  const result = filterIllegalTypes(obj)

  t.deepEqual(result, expected, 'removes illegal types from nested iterables')
  t.end()
})

test('escapeObj() escapes object properties', (t) => {
  const obj = {
    html: '<div onclick="Entity.save(e);" ><a href="/dir/route"onmouseover=$.get("//evil.site/");"?id=80">EVIL</a></div>',
    javascript: '<script>destroyWebsite();</script>',
    anArray: [123, 456],
    nested: {
      javascript: '<script>destroyWebsite();</script>',
      trim: '   this    '
    },
    trim: '   this    '
  }

  const expected = {
    html: '&lt;div onclick=&quot;Entity.save(e);&quot; &gt;&lt;a href=&quot;&#x2F;dir&#x2F;route&quot;onmouseover=$.get(&quot;&#x2F;&#x2F;evil.site&#x2F;&quot;);&quot;?id=80&quot;&gt;EVIL&lt;&#x2F;a&gt;&lt;&#x2F;div&gt;',
    javascript: '&lt;script&gt;destroyWebsite();&lt;&#x2F;script&gt;',
    anArray: [123, 456],
    nested: {
      javascript: '&lt;script&gt;destroyWebsite();&lt;&#x2F;script&gt;',
      trim: 'this'
    },
    trim: 'this'
  }

  const result = escapeObj(obj)

  t.deepEqual(result, expected, 'escapes object properties')
  t.end()
})

test('sanitizeInput() sanitizes user input', (t) => {
  const req = {
    body: {
      html: '<div onclick="Entity.save(e);" ><a href="/dir/route"onmouseover=$.get("//evil.site/");"?id=80">EVIL</a></div>',
      anArray: [123, 456],
      nested: {
        javascript: '<script>destroyWebsite();</script>',
        trim: '   this    ',
        function: () => {}
      }
    }
  }

  const res = {}
  const next = sinon.spy()

  const expectedBody = {
    html: '&lt;div onclick=&quot;Entity.save(e);&quot; &gt;&lt;a href=&quot;&#x2F;dir&#x2F;route&quot;onmouseover=$.get(&quot;&#x2F;&#x2F;evil.site&#x2F;&quot;);&quot;?id=80&quot;&gt;EVIL&lt;&#x2F;a&gt;&lt;&#x2F;div&gt;',
    anArray: [123, 456],
    nested: {
      javascript: '&lt;script&gt;destroyWebsite();&lt;&#x2F;script&gt;',
      trim: 'this'
    }
  }

  sanitizeInput(req, res, next)

  t.deepEqual(req.body, expectedBody, 'sanitizes user input')
  t.equal(next.called, true, 'calls next()')
  t.end()
})
