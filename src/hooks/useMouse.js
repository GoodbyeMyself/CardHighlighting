import { ref, onMounted } from "vue";

const DEFAULT_STYLE = "transform:perspective(1400px) rotateX(0deg) rotateY(0deg)";

// X轴 和 Y轴 最大的翻转角度
const MAX_DEG = 10;

// 悬浮高亮元素的尺寸
const HOVER_SIZE = 300;

/**
 * 解析字符串中的数值 例如auto、120px
 */
const parseNumber = (str) => {
    if (!str) return 0;

    const mt = str.match(/(\d*)px/);
    if (mt) {
        return parseFloat(mt[1]);
    }
    return 0;
};

export function useMouse(width, height, cardEl) {
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    const styles = ref(DEFAULT_STYLE);

    let hoverEl = null;

    let imgLeft = 0;
    let imgTop = 0;

    const mouseMove = (ev) => {
        let { offsetX, offsetY } = ev;

        if (ev.target && ev.target.nodeName === "IMG") {
            // 处理图片悬浮时的偏差
            // let style = getComputedStyle(ev.target);
            // offsetX += parseNumber(style.left);
            // offsetY += parseNumber(style.top);
            offsetX += imgLeft;
            offsetY += imgTop;
        }

        let rotateX = 0;
        let rotateY = 0;

        rotateX = -((halfHeight - offsetY) / halfHeight) * MAX_DEG;
        rotateY = ((halfWidth - offsetX) / halfWidth) * MAX_DEG;

        styles.value = `transform:perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        if (hoverEl) {
            let hX = offsetX - HOVER_SIZE / 2;
            let hY = offsetY - HOVER_SIZE / 2;
            hoverEl.style = `transform: translate(${hX}px, ${hY}px);`;
        }
    };
    const mouseOut = (ev) => {
        styles.value = DEFAULT_STYLE;
    };

    onMounted(() => {
        hoverEl = document.createElement("div");
        hoverEl.className = "hover-element";
        cardEl.value.append(hoverEl);

        // 获取卡片下面的图片元素的样式
        const style = getComputedStyle(cardEl.value?.children[0]?.children[2]);
        imgLeft = parseNumber(style.left);
        imgTop = parseNumber(style.top);
    });

    return {
        styles,
        mouseMove,
        mouseOut,
    };
}
