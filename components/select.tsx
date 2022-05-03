interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  children?: React.ReactNode;
  description: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

export default function Select(props: SelectProps) {
  const { id, className, children, description, onChange, ...otherProps } = props;

  return (
    <>
      <label className="mb-.5 bold text-center" htmlFor={id}>
        {description}
      </label>
      <select
        // I don't like the extra space here. Didn't want to add another library or add the functionality for this singular instance
        className={"fs-1 mb-1 " + className}
        id={id}
        name={id}
        onChange={onChange}
        {...otherProps}
      >
        {children}
      </select>
    </>
  );
}
