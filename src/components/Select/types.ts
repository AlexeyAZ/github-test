export interface ISelectProps {
  options: {
    value: string,
    title: string,
    selected?: boolean,
  }[],
  id?: string,
  className?: string,
  onChange: (e: object) => void,
}