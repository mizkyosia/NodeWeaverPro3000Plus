/**
 * Registers clicks outside of this element
 * @param node 
 * @returns 
 */
export function clickOutside(node: Node, callback: () => void) {

    const handleClick = (event: MouseEvent) => {
        if (event.target && event.target instanceof Node && !node.contains(event.target) && !event.defaultPrevented) {
            callback();
        }
    }

    document.addEventListener('click', handleClick, true);

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
        }
    }
}