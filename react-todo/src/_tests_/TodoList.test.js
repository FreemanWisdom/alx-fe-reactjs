import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../components/TodoList";

test("renders todo list", () => {
  render(<TodoList />);
  expect(screen.getByText("Learn React")).toBeInTheDocument();
});

test("adds a todo", () => {
  render(<TodoList />);

  fireEvent.change(screen.getByPlaceholderText("Add todo"), {
    target: { value: "New Todo" },
  });

  fireEvent.click(screen.getByText("Add"));

  expect(screen.getByText("New Todo")).toBeInTheDocument();
});

test("toggles a todo", () => {
  render(<TodoList />);

  const todo = screen.getByText("Learn React");
  fireEvent.click(todo);

  expect(todo).toHaveStyle("text-decoration: line-through");
});

test("deletes a todo", () => {
  render(<TodoList />);

  fireEvent.click(screen.getAllByText("Delete")[0]);

  expect(screen.queryByText("Learn React")).not.toBeInTheDocument();
});
