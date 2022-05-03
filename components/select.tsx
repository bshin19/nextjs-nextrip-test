interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  children?: React.ReactNode;
  description: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

export default function Select(props: SelectProps) {
  const { id, children, description, onChange, ...otherProps } = props;

  return (
    <>
      <label className="mb-.5 bold text-center" htmlFor={id}>
        {description}
      </label>
      <select
        className="fs-1 mb-1"
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
