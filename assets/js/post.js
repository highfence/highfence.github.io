(function () {
  var toc = document.querySelector("[data-toc]");
  var tocList = document.querySelector("[data-toc-list]");
  var content = document.querySelector(".post-content");
  if (toc && tocList && content) {
    var headings = Array.prototype.slice.call(content.querySelectorAll("h2, h3"));
    if (headings.length === 0) {
      toc.classList.add("is-empty");
    } else {
      headings.forEach(function (heading, index) {
        if (!heading.id) {
          heading.id = heading.textContent
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w가-힣-]/g, "") || "section-" + index;
        }
        var item = document.createElement("li");
        item.className = heading.tagName === "H3" ? "depth-3" : "depth-2";
        var link = document.createElement("a");
        link.href = "#" + heading.id;
        link.textContent = heading.textContent;
        item.appendChild(link);
        tocList.appendChild(item);
      });
    }
  }

  document.querySelectorAll(".highlighter-rouge").forEach(function (block) {
    if (block.closest(".code-frame")) return;
    var pre = block.querySelector("pre");
    if (!pre) return;

    var langClass = Array.prototype.slice.call(block.classList).find(function (className) {
      return className.indexOf("language-") === 0;
    });
    var label = langClass ? langClass.replace("language-", "") : "code";
    var frame = document.createElement("div");
    frame.className = "code-frame";
    var bar = document.createElement("div");
    bar.className = "code-bar";
    var name = document.createElement("span");
    name.textContent = label;
    var copy = document.createElement("button");
    copy.type = "button";
    copy.className = "copy-code";
    copy.textContent = "copy";
    copy.addEventListener("click", function () {
      navigator.clipboard.writeText(pre.textContent || "");
      copy.textContent = "copied";
      window.setTimeout(function () {
        copy.textContent = "copy";
      }, 1200);
    });
    bar.appendChild(name);
    bar.appendChild(copy);
    block.parentNode.insertBefore(frame, block);
    frame.appendChild(bar);
    frame.appendChild(block);
  });
})();
