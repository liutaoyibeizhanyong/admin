const mutations = {
  setActivePath(state, activePath) {
    state.activePath = activePath;
  },
  setCurrentPage(state, currentPage) {
    state.currentPage = currentPage;
  },
  getActionsMenu(state, data) {
    state.list = data;
  },
  setToken(state, token) {
    state.token = token;
  },
  setUser(state, user) {
    state.user = user;
  }
}
export default mutations
