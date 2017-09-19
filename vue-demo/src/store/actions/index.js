import { fetch, fetchJsonp } from '@/fetch'

// 搜索 -> https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?w=oops&n=10&p=1

// w 关键词；n 数量；p 页数

// {
//     "albumid": 1660284,
//     "albummid": "0047ChBA4Npqsc", // 专辑 id 用作歌图 img
//     "albumname": "Glory Days (Deluxe)", // 专辑名字
//     "albumname_hilight": "Glory Days (Deluxe)",
//     "alertid": 100002,
//     "chinesesinger": 0,
//     "docid": "18085608020393504684",
//     "grp": [],
//     "interval": 204, // 时长 - 秒
//     "isonly": 1,
//     "lyric": "",
//     "lyric_hilight": "",
//     "msgid": 14,
//     "nt": 3160305914,
//     "pay": {
//         "payalbum": 0,
//         "payalbumprice": 0,
//         "paydownload": 1,
//         "payinfo": 1,
//         "payplay": 0,
//         "paytrackmouth": 1,
//         "paytrackprice": 200
//     },
//     "preview": {
//         "trybegin": 0,
//         "tryend": 0,
//         "trysize": 0
//     },
//     "pubtime": 1479398400,
//     "pure": 0,
//     "singer": [
//         {
//             "id": 38039, // 歌手歌单
//             "mid": "0035W1HO3pRPKM",
//             "name": "Little Mix", // 歌手名字
//             "name_hilight": "Little Mix"
//         },
//         {
//             "id": 39000,
//             "mid": "000jnR7q3pCzYG",
//             "name": "Charlie Puth",
//             "name_hilight": "Charlie Puth"
//         }
//     ],
//     "size128": 3277460,
//     "size320": 8193287,
//     "sizeape": 24166005,
//     "sizeflac": 24513682,
//     "sizeogg": 5094151,
//     "songid": 109002013, // 歌曲 id，用作歌词
//     "songmid": "001jNQV632EnGA", // 歌曲 id，用作歌 src
//     "songname": "Oops",
//     "songname_hilight": "<span class=\"c_tx_highlight\">Oops</span>",
//     "stream": 4,
//     "switch": 636675,
//     "t": 1,
//     "tag": 10,
//     "type": 0,
//     "ver": 0,
//     "vid": ""
// }

// 歌图 img https://y.gtimg.cn/music/photo_new/T002R150x150M0000047ChBA4Npqsc.jpg?max_age=2592000

// 歌 src http://ws.stream.qqmusic.qq.com/C100001jNQV632EnGA.m4a?fromtag=0

//  歌词 https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg?musicid=109002013&nobase64=1&songtype=0

// 歌手歌单 https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?begin=0&num=10&singerid=38039

export default {
  updateNumber ({ commit }, number) {
    commit('setNumber', number)
  },
  async getCms  ({ commit }) {
    try {
      const json = await fetch('http://cms.cekid.com/publish/998/newindex2017.json')
      commit('setCms', json)
    } catch (e) {
      console.log(e)
    }
  },
  async getSearch ({ commit }, { w, p }) {
    try {
      const json = await fetchJsonp('https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp', {
        w,
        n: 10,
        p
      }, {
        jsonpCallback: 'jsonpCallback'
      })
      if (json.code === 0 && json.subcode === 0) {
        const keyword = json.data && json.data.keyword
        const song = (json.data && json.data.song && json.data.song) || {}
        song.keyword = keyword
        commit('setSearch', song)
      }
    } catch (e) {
      console.log(e)
    }
  }
}
