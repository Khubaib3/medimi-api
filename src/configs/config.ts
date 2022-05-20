let constant = {
  TRUE: true,
  FALSE: false,
  SECRET: 'medimiSecretKey',
  TRUEMSG: "Successful",
  FALSEMSG: "Please try again later",
  removeProperty: (propKey, { [propKey]: propValue, ...rest }) => rest
}

export default constant