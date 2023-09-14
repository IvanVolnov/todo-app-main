export const ListenClick = function (base, closest, callback) {
  base.addEventListener("click", function (e) {
    const item = e.target.closest(closest);
    if (item && base.contains(item)) {
      callback(e);
    }
  });
};
