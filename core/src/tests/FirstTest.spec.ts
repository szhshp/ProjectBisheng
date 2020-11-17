import { removeBlankLinesAtTheEnd, replacePunctuations } from '@src/formatters'

describe('Remove Blank Lines At The End', () => {
  test('Remove Blank Lines At The End', () => {
    const before = `
末尾附带很多空行的文本,清理之后应该只剩一行



`
    const after = `
末尾附带很多空行的文本,清理之后应该只剩一行
`
    expect(removeBlankLinesAtTheEnd(before)).toEqual(after)
  })
})

describe('Replace Punctuations', () => {
  test('Replace Chinese Punctuations 1', () => {
    const before = '这里是一段中文，带着中文符号。这里是一段中文！带着中文符号？'
    const after = '这里是一段中文,带着中文符号.这里是一段中文!带着中文符号?'
    expect(replacePunctuations(before)).toEqual(after)
  })

  test('Replace Chinese Punctuations 2', () => {
    const before = '这里是一段中文带着（全角）括号'
    const after = '这里是一段中文带着(全角)括号'
    expect(replacePunctuations(before)).toEqual(after)
  })
})
