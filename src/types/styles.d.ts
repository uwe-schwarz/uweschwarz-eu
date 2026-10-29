declare module "*.css";
declare module "*.scss";
declare module "*.sass";

declare module "*.txt" {
  const text: string;
  export default text;
}
