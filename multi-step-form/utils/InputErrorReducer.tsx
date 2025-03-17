import { stateType, actionType } from "../types/Type";

export default function InputErrorReducer(
  state: stateType,
  action: actionType
) {
  switch (action.type) {
    case "NAME":
      return {
        ...state,
        name: {
          ...state.name,
          isError: action.isError,
        },
      };

    case "EMAIL":
      return {
        ...state,
        email: {
          ...state.email,
          isError: action.isError,
        },
      };

    case "PHONE":
      return {
        ...state,
        phone: {
          ...state.phone,
          isError: action.isError,
        },
      };

    default:
      return state;
  }
}
