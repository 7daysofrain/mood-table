export default function lcdName(name) {
    if(name.indexOf(' ') === -1) {
        return name.substr(0,2)
    }
    else{
        const parts = name.split(' ');
        return parts[0].charAt(0) + parts[1].charAt(0);
    }
}
