import gcoord from 'gcoord';
import { toFixed } from 'utils/customMath';
export class MapUtil {
  /**
   * WGS84转GCj02
   * @param lng
   * @param lat
   * @returns {*[]}
   */
  public static wgs84togcj02(lng: number, lat: number): [number, number] {
    const [parseLng, parseLat] = gcoord.transform(
      [lng, lat],
      gcoord.WGS84,
      gcoord.GCJ02,
    );
    return [toFixed(parseLng, 8), toFixed(parseLat, 8)];
  }

  /**
   * GCJ02 转换为 WGS84
   * @param lng
   * @param lat
   * @returns {*[]}
   */
  public static gcj02towgs84(lng: number, lat: number): [number, number] {
    const [parseLng, parseLat] = gcoord.transform(
      [lng, lat],
      gcoord.GCJ02,
      gcoord.WGS84,
    );
    return [toFixed(parseLng, 8), toFixed(parseLat, 8)];
  }
}
