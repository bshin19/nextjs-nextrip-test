import { fireEvent, render } from "@testing-library/react";
import Select from "../components/select";

describe("Select", () => {
  const required = {
    id: "foo",
    description: "bar",
  };

  it("should invoke onChange", () => {
    const testid = "dogs";
    const onChange = jest.fn();

    expect(onChange).not.toHaveBeenCalled();

    const { getByTestId } = render(
      <Select {...required} data-testid={testid} onChange={onChange}>
        <option>text</option>
      </Select>
    );

    fireEvent.change(getByTestId(testid));
    expect(onChange).toHaveBeenCalled();
  });

  it("should match minimum config", () => {
    const { container } = render(<Select {...required}></Select>);
    expect(container).toMatchSnapshot();
  });

  it("should match fully configured", () => {
    const { container } = render(
      <Select {...required} data-x="my_data" name="my_name">
        <option>floobar</option>
      </Select>
    );

    expect(container).toMatchSnapshot();
  });
});
