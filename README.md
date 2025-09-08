1) What is the difference between var, let, and const?

<!-- var -->
Old way (before ES6/2015).
Scope: Function-scoped (if declared inside a function, it’s only accessible there; otherwise, global).
Hoisting: Variables declared with var are hoisted to the top of their scope and initialized as undefined.
Redeclaration: You can redeclare the same variable in the same scope without error.
<!-- let -->
Introduced in ES6 (2015).
Scope: Block-scoped (only accessible inside { }).
Hoisting: Also hoisted, but not initialized (stays in the “Temporal Dead Zone” until defined).
Redeclaration: Cannot redeclare the same variable in the same scope.
<!-- const -->
Introduced in ES6 (2015).
Scope: Block-scoped (same as let).
Hoisting: Hoisted but not initialized (Temporal Dead Zone).
Redeclaration: Not allowed in the same scope.
Reassignment: Not allowed (but objects/arrays declared with const can have their contents mutated).



2) What is the difference between map(), forEach(), and filter()?
<!-- forEach() -->
Used for looping through an array.
Executes a function for each element.
Doesn’t return anything (always returns undefined).
Best when you just want to do something with each item (e.g., print, update, store elsewhere).
<!-- map() -->
Used for transforming arrays.
Creates a new array with the results of applying a function to each element.
Doesn’t change the original array.
Best when you want to modify items and keep the results.
<!-- filter() -->
Used for filtering arrays.
Creates a new array with only the elements that pass a condition (true/false).
Best when you want to remove some elements.



3) What are arrow functions in ES6?
An arrow function is a shorter way to write functions in JavaScript.
It uses the => syntax instead of the traditional function keyword.
1. Shorter Syntax
2. Implicit Return
3. No Own this
4. Cannot be used as Constructors



4) How does destructuring assignment work in ES6?
Destructuring assignment is a way to unpack values from arrays or objects into separate variables, using a clean, short syntax.



5) Explain template literals in ES6. How are they different from string concatenation?
Template literals allow you to create strings with embedded expressions, multiline strings, and easier formatting.
They use backticks (` `) instead of single ' ' or double quotes " ".


Syntax-------	"Hello " + name + "!" ---	`Hello ${name}!`
Multiline strings---	Requires \n  ---	Directly write across multiple lines
Expressions-----	Must break string and use +	---   Embed using ${expression}
Readability----	Harder for complex strings ---	Much cleaner and readable