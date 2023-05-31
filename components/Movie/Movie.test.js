// We import the render method and the screen object from our react-testing-library
import { render, screen } from "@testing-library/react";
// import the userEvent (is a default export) from the testing library
import userEvent from "@testing-library/user-event";
// and we need the component to use it in our render method
import Movie from ".";
// declare a test block with a test description and the test function
// test descriptions should always describe what is going to be tested in present tense
// and should NOT contain implementation details
test("renders a movie", () => {
  // call render to get a simulated component for the test
  render(<Movie name="The Matrix Reloaded" />);
  // once rendered, we can access elements of our component via the screen object
  // see https://testing-library.com/docs/queries/about/#priority for the appropriate query to identify the element
  const matrixHeading = screen.getByRole("heading", {
    name: "The Matrix Reloaded",
  });
  // finally we declare our expected test result
  expect(matrixHeading).toBeInTheDocument();
});

test("renders a movie with a like button", () => {
  // call render to get the simulated component for the test
  render(<Movie name="The Matrix Reloaded" />);
  // once rendered, we can access elements of our component via the screen object
  // and get the button by querying for the accessible name of it (the button title or aria-label in this case)
  const matrixLikeButton = screen.getByRole("button", {
    name: "like The Matrix Reloaded",
  });
  // finally we declare our expected test result
  expect(matrixLikeButton).toBeInTheDocument();
});

test("renders a movie with a unlike button", () => {
  // call render to get the simulated component for the test
  render(<Movie name="The Matrix Reloaded" isLiked={true} />);
  // once rendered, we can access elements of our component via the screen object
  // and get the button by querying for the accessible name of it (the button title or aria-label in this case)
  const matrixUnlikeButton = screen.getByRole("button", {
    name: "unlike The Matrix Reloaded",
  });
  // finally we declare our expected test result
  expect(matrixUnlikeButton).toBeInTheDocument();
});

test("renders a movie with a delete button", () => {
  // call render to get the simulated component for the test
  render(<Movie name="The Matrix Reloaded" />);
  // once rendered, we can access elements of our component via the screen object
  // and get the button by querying for the accessible name of it (the button title or aria-label in this case)
  const matrixDeleteButton = screen.getByRole("button", {
    name: "delete The Matrix Reloaded",
  });
  // finally we declare our expected test result
  expect(matrixDeleteButton).toBeInTheDocument();
});
// ----------------------
// Test user interactions
// ----------------------
test("calls the onToggleLike handler with the id when the like button is clicked", async () => {
  // initialize a user to simulate user interaction
  const user = userEvent.setup();
  // declare a mock function as a handler to be executed and provided as prop to our simulated component
  const handleToggleLike = jest.fn();
  // call render to get the simulated component for the test (see the mock function to be provided as prop 'onToggleLike')
  render(
    <Movie
      id="1337"
      name="The Matrix Reloaded"
      onToggleLike={handleToggleLike}
    />
  );
  // once rendered, we can access elements of our component via the screen object
  // and get the button by querying for the accessible name of it (the button title or aria-label in this case)
  const matrixLikeButton = screen.getByRole("button", {
    name: "like The Matrix Reloaded",
  });
  // we await for the (simulated) user to perform an action (click the button)
  await user.click(matrixLikeButton);
  // finally we declare our expected test result, the handleToggleLike (mock) function to be executed with the provided id
  expect(handleToggleLike).toHaveBeenCalledWith("1337");
});

test("calls the onDeleteMovie handler with the id when the delete button is clicked", async () => {
  // initialize a user to simulate user interaction
  const user = userEvent.setup();
  // declare a mock function as a handler to be executed and provided as prop to our simulated component
  const handleDeleteMovie = jest.fn();
  // call render to get the simulated component for the test (see the mock function to be provided as prop 'onDeleteMovie')
  render(
    <Movie
      id="1337"
      name="The Matrix Reloaded"
      onDeleteMovie={handleDeleteMovie}
    />
  );
  // once rendered, we can access elements of our component via the screen object
  // and get the button by querying for the accessible name of it (the button title or aria-label in this case)
  const matrixDeleteButton = screen.getByRole("button", {
    name: "delete The Matrix Reloaded",
  });
  // we await for the (simulated) user to perform an action (click the button)
  await user.click(matrixDeleteButton);
  // finally we declare our expected test result, the handleToggleLike (mock) function to be executed with the provided id
  expect(handleDeleteMovie).toHaveBeenCalledWith("1337");
});
