// import axios from "axios";
import fetchJsonp from "fetch-jsonp";

/**
 * 音乐播放器
 */

// 获取音乐播放列表
export const getPlayerList = async (server, type, id) => {
  const res = await fetch(
    `${import.meta.env.VITE_SONG_API}?server=${server}&type=${type}&id=${id}`,
  );
  const data = await res.json();

  if (data[0].url.startsWith("@")) {
    // eslint-disable-next-line no-unused-vars
    const [handle, jsonpCallback, jsonpCallbackFunction, url] = data[0].url.split("@").slice(1);
    const jsonpData = await fetchJsonp(url).then((res) => res.json());
    const domain = (
      jsonpData.req_0.data.sip.find((i) => !i.startsWith("http://ws")) ||
      jsonpData.req_0.data.sip[0]
    ).replace("http://", "https://");

    return data.map((v, i) => ({
      name: v.name || v.title,
      artist: v.artist || v.author,
      url: domain + jsonpData.req_0.data.midurlinfo[i].purl,
      cover: v.cover || v.pic,
      lrc: v.lrc,
    }));
  } else {
    return data.map((v) => ({
      name: v.name || v.title,
      artist: v.artist || v.author,
      url: v.url,
      cover: v.cover || v.pic,
      lrc: v.lrc,
    }));
  }
};

/**
 * 一言
 */

// 获取一言数据
export const getHitokoto = async () => {
  const res = await fetch("https://v1.hitokoto.cn");
  return await res.json();
};

/**
 * 天气
 */

// 获取高德地理位置信息
export const getAdcode = async (key) => {
  const res = await fetch(`https://restapi.amap.com/v3/ip?key=${key}`);
  return await res.json();
};

// 获取高德地理天气信息
export const getWeather = async (key, city) => {
  const res = await fetch(
    `https://restapi.amap.com/v3/weather/weatherInfo?key=${key}&city=${city}`,
  );
  return await res.json();
};

// 获取 wttr.in 天气 API（免费，无需 Key，自动 IP 定位）
// https://wttr.in/:help
export const getOtherWeather = async () => {
  const res = await fetch("https://wttr.in/?format=j1&lang=zh");
  const data = await res.json();
  const current = data.current_condition[0];
  const area = data.nearest_area[0];
  // 兼容原有数据结构
  return {
    result: {
      city: {
        City: area.areaName[0].value,
      },
      condition: {
        day_weather:
          (current.lang_zh && current.lang_zh[0]?.value) ||
          current.weatherDesc[0]?.value ||
          "未知",
        min_degree: current.temp_C,
        max_degree: current.FeelsLikeC || current.temp_C,
        day_wind_direction: (() => {
          const dir = current.winddir16Point || "";
          const dirMap = {
            N: "北风", NNE: "北东北风", NE: "东北风", ENE: "东东北风",
            E: "东风", ESE: "东东南风", SE: "东南风", SSE: "南东南风",
            S: "南风", SSW: "南西南风", SW: "西南风", WSW: "西西南风",
            W: "西风", WNW: "西西北风", NW: "西北风", NNW: "北西北风",
          };
          return dirMap[dir] || dir;
        })(),
        day_wind_power: Math.round(Number(current.windspeedKmph) / 10) || "≤3",
      },
    },
  };
};
