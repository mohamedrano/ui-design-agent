module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 72],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'feat', // feature
        'fix', // bug fix
        'docs', // documentation
        'style', // formatting, missing semi colons, etc
        'refactor', // code change that neither fixes a bug nor adds a feature
        'perf', // performance improvements
        'test', // adding missing tests
        'chore', // maintenance
      ],
    ],
  },
};