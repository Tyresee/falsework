import Vue from 'vue'
import test from '@/components/test'

describe('test', () => {
  it('sets the correct default data', () => {
    expect(typeof test.data).equal('function')
    const defaultData = test.data()
    expect(defaultData.msg).equal('Vue.js App')
  })
  it('has a created hook', () => {
    expect(typeof test.created).equal('function')
  })
  it('should render correct contents', () => {
    const Constructor = Vue.extend(test)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.test h1').textContent)
      .to.equal('test Vue.js App')
  })
  it('should update contents after click', done => {
    const Constructor = Vue.extend(test)
    const vm = new Constructor().$mount()
    vm.$el.querySelector('.test h1').click()
    Vue.nextTick(() => {
      expect(vm.$el.querySelector('.test h1').textContent)
        .to.equal('click')
      done()
    })
  })
})
