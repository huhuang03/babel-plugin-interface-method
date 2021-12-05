import {parse} from '@babel/parser'

function getParse(code: string) {
  // what this parse return?
  return () => parse(code, {sourceType: 'module'});
}

describe('curry function syntax', () => {
  it('should parse', function () {
    expect(getParse(`function @@ foo() {}`)()).toMatchSnapshot();
  })
})


