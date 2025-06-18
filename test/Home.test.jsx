import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import Home from "../src/sections/Home/Home";

describe("Home Component", () => {
  test("renders MooMind heading and buttons", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText("MooMind")).toBeInTheDocument();
    expect(screen.getByText("Creative")).toBeInTheDocument();
    expect(screen.getByText("& Collaborative")).toBeInTheDocument();
    expect(screen.getByText("New Design")).toBeInTheDocument();
    expect(screen.getByText("Previous Design")).toBeInTheDocument();
  });
});
