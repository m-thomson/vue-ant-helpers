// noinspection ES6PreferShortImport
import { _ant } from '../../src/antTools'

describe('Ant tools', () => {
  it(_ant.defineColumn.name, () => {
    expect(_ant.defineColumn('Foo', 'foo')).toEqual({ dataIndex: 'foo', key: 'foo', title: 'Foo' })
  })
  it(_ant.defineColumnSortable.name, () => {
    expect(_ant.defineColumnSortable('Foo', 'foo'))
      .toEqual({ dataIndex: 'foo', key: 'foo', sorter: true, title: 'Foo' })
  })
  it(_ant.defineColumnSlotted.name, () => {
    expect(_ant.defineColumnSlotted('Foo', 'foo', 'theSlot'))
      .toEqual({ dataIndex: 'foo', key: 'foo', scopedSlots: { customRender: 'theSlot' }, title: 'Foo' })
  })
  it(_ant.defineChoices.name, () => {
    let expectedResult = [
      { key: 'none', label: '(None)' },
      { key: 'one', label: 'one' },
      { key: 'two', label: 'two' },
    ]
    const choices1 = ['one', 'two']
    const choices2 = [{ key: 'one', label: 'one' }, { key: 'two', label: 'two' }]
    const choices3 = [{ one: 'one' }, { two: 'two' }]
    expect(_ant.defineChoices(choices1, true)).toEqual(expectedResult)
    expect(_ant.defineChoices(choices2, true)).toEqual(expectedResult)
    expect(_ant.defineChoices(choices3, true)).toEqual(expectedResult)
  })
})
