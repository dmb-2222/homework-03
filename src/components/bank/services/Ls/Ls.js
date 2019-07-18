const LsBankHistory = {
  setBankHistory(arrHistory) {
    localStorage.setItem("bankHistory", JSON.stringify(arrHistory));
  },
  getBankHistory() {
    return JSON.parse(localStorage.getItem("bankHistory"));
  },
  clearLS() {
    localStorage.clear();
  }
};
export default LsBankHistory;
