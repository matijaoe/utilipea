import { matijaoe } from '@matijaoe/eslint-config'

export default matijaoe({
  rules: {
    'ts/no-use-before-define': 'off',
    'no-param-reassign': 'off',
    'style/max-statements-per-line': ['error', { max: 2 }],
  }
})
