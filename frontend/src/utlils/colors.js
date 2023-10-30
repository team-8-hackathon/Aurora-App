

export default function topicColor (topicId) {
    const colors = { 1: '#ffe27a', 2: '#ec9fb8', 3: '#9acfb1', 4: '#f4a182'}
    let color;
    if(1 <= topicId <= 4){
        color=colors[topicId]
    } else color = colors[0]
    return color;
}