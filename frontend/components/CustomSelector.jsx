/** @jsx jsx */
import { jsx } from "@emotion/react";
import Select, { OptionProps } from "react-select";

const Option = (props) => {
  const {
    children,
    className,
    cx,
    getStyles,
    isDisabled,
    isFocused,
    isSelected,
    innerRef,
    innerProps,
  } = props;
  return (
    <>
      <div
        ref={innerRef}
        css={getStyles("option", props)}
        className={cx(
          {
            option: true,
            "option--is-disabled": isDisabled,
            "option--is-focused": isFocused,
            "option--is-selected": isSelected,
          },
          className
        )}
        {...innerProps}
      >
        {children}
      </div>
    </>
  );
};

export default () => (
  <Select
    closeMenuOnSelect={false}
    components={{ Option }}
    styles={{
      option: (base) => ({
        ...base,
        border: `1px dotted ${"black"}`,
        height: "100%",
      }),
    }}
    defaultValue={"black"}
    options={"black"}
  />
);
