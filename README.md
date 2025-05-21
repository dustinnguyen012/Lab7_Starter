### Question 1: Where would you fit automated tests?

**Answer:** GitHub action on push

Running automated tests as part of a GitHub Action on every push ensures that code is continuously tested and validated before it gets merged into the main branch. This helps catch bugs early, prevents broken code from being deployed, and encourages a consistent development workflow across the team.


### Question 2: Would you use an end to end test to check if a function is returning the correct output?

**Answer:** No, End-to-end (E2E) tests are designed to simulate real user interactions and test the flow of the application as a whole. They are not intended for verifying individual function outputs. For checking whether a function returns the correct output, **unit tests** are better suited because they focus on small, isolated pieces of code.


### Question 3: What is the difference between navigation and snapshot mode?

**Navigation mode** analyzes the page from the moment it loads and simulates a full page visit. It captures performance metrics like load time, accessibility, SEO, and more based on how the page performs from start to finish.

**Snapshot mode** takes a static snapshot of the current page without simulating a full page load. It’s useful for analyzing the current state of the DOM, especially for checking accessibility or UI structure, but it does not measure performance over time or interactions.


### Question 4: Name three things we could do to improve the CSE 110 shop site based on the Lighthouse results.

1. **Optimize image sizes** – Many product images are large and not compressed, which slows down load time. Using WebP or compressed JPGs would improve performance.
2. **Improve accessibility** – Add proper `alt` text to images and ensure all interactive elements have ARIA labels for screen readers.
3. **Reduce unused JavaScript** – Some scripts load functionality that may not be used immediately. Code-splitting could improve load speed and efficiency.

