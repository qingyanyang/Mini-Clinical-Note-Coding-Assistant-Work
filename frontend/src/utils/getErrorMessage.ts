export interface IFieldRuleOptions {
  required?: boolean;
  limit?: number;
  label?: string;
}

export const defaultErrorMessage = (label: string) => {
  return {
    required: `${label} is required`,
    limit: ` character limit`,
  };
};

export const getErrorMessage = (value: string, props: IFieldRuleOptions) => {
  const { required = false, label = "", limit = null } = props;

  if (required && !value) {
    return defaultErrorMessage(label).required;
  }
  if (limit && value) {
    if (limit === value.length) {
      return limit + defaultErrorMessage(label).limit;
    }
  }
  return "";
};
