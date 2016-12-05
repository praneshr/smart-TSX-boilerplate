interface IActionTypes {
  SAMPLE: string;
}

const actionTypes = [
  'SAMPLE',
]

const map: IActionTypes = actionTypes.reduce((obj: Object, str: string) =>
  (<any>Object).assign({}, obj, { [str]: str }),
{})

export default map
