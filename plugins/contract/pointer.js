export function handle(state, action) {
  const input = action.input;
  const caller = action.caller;
  const option = input.function;

  if (option === "append") {
    if (typeof input.txId !== "string" || input.txId.length != 43) {
      throw new ContractError(`Invalid txId provided: ${input.txId}`);
    }
    if (caller !== state.owner) {
      throw new ContractError("No Access");
    }
    state.manifests.push(input.txId);
    return { state };
  } else if (option === "update") {
    if (!Array.isArray(input.txIds)) {
      throw new ContractError(`Invalid array provided: ${input.txIds}`);
    }
    if (caller !== state.owner) {
      throw new ContractError("No Access");
    }
    for (const item of input.txIds) {
      if (typeof item !== "string" || item.length != 43) {
        throw new ContractError(`Invalid txId provided: ${item}`);
      }
    }
    state.manifests = input.txIds;
    return { state };
  }
  throw new ContractError("Invalid input");
}
