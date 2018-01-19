## Functions

<dl>
<dt><a href="#$render">$render()</a> ⇒ <code>XML</code></dt>
<dd><p>Dependent classes can override this virtual <code>$render</code> method
to create situations where they can do such things as
updateChildProps on the fly to gain test coverage for such a scenario.
To gain such coverage one can override this method and return
the target component passing to it <code>this.state</code>. For example:</p>
<pre><code>$render() { return &lt;MyComponent { ...this.state }/&gt; }
</code></pre></dd>
<dt><a href="#updateChildProps">updateChildProps(value)</a></dt>
<dd><p>This method exposes a entry point for a pattern that enables
dependent tests to obtain test coverage for those cases where
system components require testing of prop value updates during
the course of their lifecycle. To leverage this pattern
successfully the developer will need to extend this <code>Context</code>
class and override the <code>$render</code> method such that it returns
their target, prop-updating component after passing
<code>this.state</code> into the target component. For example:
<code>return(&lt;MyComponent {...this.state}/&gt;)</code></p>
</dd>
<dt><a href="#rerender">rerender()</a></dt>
<dd><p>This method exposes an expressive means to perform a rerendering
of a this Context.</p>
</dd>
<dt><a href="#renderComponent">renderComponent(component)</a> ⇒ <code>function</code></dt>
<dd></dd>
</dl>

<a name="$render"></a>

## $render() ⇒ <code>XML</code>
Dependent classes can override this virtual `$render` method
to create situations where they can do such things as
updateChildProps on the fly to gain test coverage for such a scenario.
To gain such coverage one can override this method and return
the target component passing to it `this.state`. For example:
```
$render() { return <MyComponent { ...this.state }/> }

```

**Kind**: global function  
<a name="updateChildProps"></a>

## updateChildProps(value)
This method exposes a entry point for a pattern that enables
dependent tests to obtain test coverage for those cases where
system components require testing of prop value updates during
the course of their lifecycle. To leverage this pattern
successfully the developer will need to extend this `Context`
class and override the `$render` method such that it returns
their target, prop-updating component after passing
`this.state` into the target component. For example:
`return(<MyComponent {...this.state}/>)`

**Kind**: global function  

| Param | Description |
| --- | --- |
| value | Object literal of new props |

<a name="rerender"></a>

## rerender()
This method exposes an expressive means to perform a rerendering
of a this Context.

**Kind**: global function  
<a name="renderComponent"></a>

## renderComponent(component) ⇒ <code>function</code>
**Kind**: global function  
**Returns**: <code>function</code> - - Function that returns a jQuery style selection result augmented
 with a pointer to the component for component.destroy() call.  

| Param | Description |
| --- | --- |
| component | A React Component to test, e.g. <ExampleComponent /> |

