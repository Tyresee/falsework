export default {
  setNumber (state, data) {
    state.number += data
  },
  setCms (state, data) {
    state.cms = data
  },
  setSearch (state, data) {
    if (data.curpage === 1) {
      state.search = data
    } else {
      const flag = state.search
      state.search = {
        keyword: data.keyword,
        curnum: data.curnum,
        curpage: data.curpage,
        list: flag.list.concat(data.list),
        totalnum: data.totalnum
      }
    }
  },
  setSong (state, data) {
    state.song = data
  }
}
