export const generateModelAResponse = async (
  prompt: string
) => {
  await new Promise((resolve) =>
    setTimeout(resolve, 800)
  );

  return `AI systems can analyze ${prompt} efficiently and provide intelligent responses`;
};

export const generateModelBResponse = async (
  prompt: string
) => {
  await new Promise((resolve) =>
    setTimeout(resolve, 800)
  );

  return `Modern AI systems can deeply analyze ${prompt} efficiently and generate advanced intelligent responses`;
};