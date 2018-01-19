## Classes

<dl>
<dt><a href="#Context">Context</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#startServer">startServer()</a></dt>
<dd><p>Starts a mock server for Unit Tests that cover code sections
that include calls to a server. This must be called before
you can successfully use <code>sendResponse</code>.</p>
</dd>
<dt><a href="#stopServer">stopServer()</a></dt>
<dd><p>Stops a mock server started with <code>startServer</code></p>
</dd>
<dt><a href="#loadDom">loadDom([markup], [config])</a></dt>
<dd><p>Loads a fully functional, unsecure, in-memory headless DOM.
Note that you should only load this DOM if you know what
you are loading into it, and what your test will be executing.
This DOM can load external images and will run script. This
does expose the ability for malicious code to potentially
access your OS through Node.</p>
</dd>
<dt><a href="#loadSafeDom">loadSafeDom([markup], [config])</a></dt>
<dd><p>Load a secure in-memory headless DOM. Note that there are no
security guarantees with this DOM, though it does not allow for
image loading or running scripts, negating these avenues as
potential attack vectors for malicious code.</p>
</dd>
<dt><a href="#unloadDom">unloadDom()</a></dt>
<dd><p>Unloads a DOM loaded with <code>loadDom</code> or <code>loadSafeDom</code></p>
</dd>
<dt><a href="#renderComponent">renderComponent(component)</a> ⇒ <code>function</code></dt>
<dd><p>Renders a component into a DOM loaded with <code>loadDom</code> or <code>loadSafeDom</code></p>
</dd>
<dt><a href="#sendResponse">sendResponse(response, [index])</a> ⇒ <code>*</code></dt>
<dd></dd>
</dl>

<a name="Context"></a>

## Context
**Kind**: global class  

* [Context](#Context)
    * [new Context(props)](#new_Context_new)
    * [.$render()](#Context+$render) ⇒ <code>XML</code>
    * [.updateChildProps(value)](#Context+updateChildProps)
    * [.rerender()](#Context+rerender)
    * [.destroy()](#Context+destroy)

<a name="new_Context_new"></a>

### new Context(props)

| Param |
| --- |
| props | 

<a name="Context+$render"></a>

### context.$render() ⇒ <code>XML</code>
Dependent classes can override this virtual `$render` method
to create situations where they can do such things as
updateChildProps on the fly to gain test coverage for such a scenario.
To gain such coverage one can override this method and return
the target component passing to it `this.state`. For example:
```
$render() { return <MyComponent { ...this.state }/> }

```

**Kind**: instance method of [<code>Context</code>](#Context)  
**Access**: protected  
<a name="Context+updateChildProps"></a>

### context.updateChildProps(value)
This method exposes a entry point for a pattern that enables
dependent tests to obtain test coverage for those cases where
system components require testing of prop value updates during
the course of their lifecycle. To leverage this pattern
successfully the developer will need to extend this `Context`
class and override the `$render` method such that it returns
their target, prop-updating component after passing
`this.state` into the target component. For example:
`return(<MyComponent {...this.state}/>)`

**Kind**: instance method of [<code>Context</code>](#Context)  
**Access**: public  

| Param | Description |
| --- | --- |
| value | Object literal of new props |

<a name="Context+rerender"></a>

### context.rerender()
Exposes an expressive means to perform a rerendering
of a this Context.

**Kind**: instance method of [<code>Context</code>](#Context)  
**Access**: public  
<a name="Context+destroy"></a>

### context.destroy()
Clean up this component and cover `unmount`

**Kind**: instance method of [<code>Context</code>](#Context)  
**Access**: public  
<a name="startServer"></a>

## startServer()
Starts a mock server for Unit Tests that cover code sections
that include calls to a server. This must be called before
you can successfully use `sendResponse`.

**Kind**: global function  
<a name="stopServer"></a>

## stopServer()
Stops a mock server started with `startServer`

**Kind**: global function  
<a name="loadDom"></a>

## loadDom([markup], [config])
Loads a fully functional, unsecure, in-memory headless DOM.
Note that you should only load this DOM if you know what
you are loading into it, and what your test will be executing.
This DOM can load external images and will run script. This
does expose the ability for malicious code to potentially
access your OS through Node.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| [markup] | <code>string</code> | Optional initialization markup. |
| [config] | <code>Object</code> | JSDom configuration options. |

<a name="loadSafeDom"></a>

## loadSafeDom([markup], [config])
Load a secure in-memory headless DOM. Note that there are no
security guarantees with this DOM, though it does not allow for
image loading or running scripts, negating these avenues as
potential attack vectors for malicious code.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| [markup] | <code>string</code> | Optional initialization markup. |
| [config] | <code>Object</code> | JSDom configuration options. |

<a name="unloadDom"></a>

## unloadDom()
Unloads a DOM loaded with `loadDom` or `loadSafeDom`

**Kind**: global function  
<a name="renderComponent"></a>

## renderComponent(component) ⇒ <code>function</code>
Renders a component into a DOM loaded with `loadDom` or `loadSafeDom`

**Kind**: global function  
**Returns**: <code>function</code> - - Function that returns a jQuery style selection result augmented
 with a local member `component` that returns a pointer to the rendered Component.  

| Param | Type | Description |
| --- | --- | --- |
| component | <code>Component</code> | A React Component to test, e.g. <ExampleComponent /> |

<a name="sendResponse"></a>

## sendResponse(response, [index]) ⇒ <code>\*</code>
**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| response | <code>Object</code> |  | A response object |
| response.status | <code>number</code> |  | An HTTP status code. |
| response.response | <code>Object</code> |  | A mock response payload. |
| [index] | <code>number</code> | <code>0</code> | The index of the response that you want to send. This is useful for those instances where your codebase makes multiple service calls and you need to send responses back to some or all of them. |

