export declare class MapUtil {
    /**
     * WGS84转GCj02
     * @param lng
     * @param lat
     * @returns {*[]}
     */
    static wgs84togcj02(lng: number, lat: number): [number, number];
    /**
     * GCJ02 转换为 WGS84
     * @param lng
     * @param lat
     * @returns {*[]}
     */
    static gcj02towgs84(lng: number, lat: number): [number, number];
}
