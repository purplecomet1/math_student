## Overview

I used NextJS since it provides a simple and easy template to quickly build React projects, whilst also being easily extendable.

The workflow of the website is pretty simple:

1. Site generates two random integers
2. User inputs what the sum is and hits "Submit"
3. The site pings the math.js library
4. If the user is correct, a new question is provided
5. If the user is incorrect, they can try again 
6. At any point, the user can skip the question and generate a new one

## Extending

Extending the application is relatively straightforward.

For instance, to generate more complex math problems (subtraction, multiplication, etc.), you would simply store the operation in state, and then URL-encode it when calling the math.js API. Multiple integers can be supported by keeping a list, rather than a tuple of integers.

As for another example, suppose we wanted to add a timer. This would be straightforward, we could make use of setInterval and simply not accept user inputs if the interval has reached it's limit.
