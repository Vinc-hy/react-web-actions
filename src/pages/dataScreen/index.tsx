import { useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AgeRatioChart from "./components/AgeRatioChart";
import AnnualUseChart from "./components/AnnualUseChart";
import HotPlateChart from "./components/HotPlateChart";
import MaleFemaleRatioChart from "./components/MaleFemaleRatioChart";
import OverNext30Chart from "./components/OverNext30Chart";
import PlatformSourceChart from "./components/PlatformSourceChart";
import RealTimeAccessChart from "./components/RealTimeAccessChart";
import ChinaMapChart from "./components/ChinaMapChart";
import Headertime from "./components/DataHeaderTime";
import dataScreenTitle from "./images/dataScreen-title.png";
import styles from "./index.module.scss";

const DataScreen = () => {
  const navigate = useNavigate();
  const handleTo = () => {
    navigate("/home");
  };
  const dataScreenRef = useRef<HTMLDivElement>(null);

  /* 浏览器监听 resize 事件 */
  const resize = () => {
    if (dataScreenRef.current) {
      dataScreenRef.current.style.transform = `scale(${getScale()}) translate(-50%, -50%)`;
    }
  };

  /* 根据浏览器大小推断缩放比例 */
  const getScale = (width = 1920, height = 1080) => {
    const ww = window.innerWidth / width;
    const wh = window.innerHeight / height;
    return ww < wh ? ww : wh;
  };

  useLayoutEffect(() => {
    if (dataScreenRef.current) {
      dataScreenRef.current.style.transform = `scale(${getScale()}) translate(-50%, -50%)`;
      dataScreenRef.current.style.width = `1920px`;
      dataScreenRef.current.style.height = `1080px`;
    }
    // 为浏览器绑定事件
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className={styles["dataScreen-container"]}>
      <div className={styles["dataScreen"]} ref={dataScreenRef}>
        <div className={styles["dataScreen-header"]}>
          <div className={styles["header-lf"]}>
            <span className={styles["header-screening"]} onClick={handleTo}>
              首页
            </span>
          </div>
          <div className={styles["header-ct"]}>
            <div className={styles["header-ct-title"]}>
              <span>可视化大数据展示平台</span>
              <div className={styles["header-ct-warning"]}>
                平台高峰预警信息（2条）
              </div>
            </div>
          </div>
          <div className={styles["header-rg"]}>
            <span className={styles["header-download"]}>统计报告</span>
            <Headertime />
          </div>
        </div>
        <div className={styles["dataScreen-main"]}>
          <div className={styles["dataScreen-lf"]}>
            <div className={styles["dataScreen-top"]}>
              <div className={styles["dataScreen-main-title"]}>
                <span className={styles["span"]}>实时游客统计</span>
                <img className={styles["img"]} src={dataScreenTitle} alt="" />
              </div>
              <div className={styles["dataScreen-main-chart"]}>
                <RealTimeAccessChart />
              </div>
            </div>
            <div className={styles["dataScreen-center"]}>
              <div className={styles["dataScreen-main-title"]}>
                <span className={styles["span"]}>男女比例</span>
                <img className={styles["img"]} src={dataScreenTitle} alt="" />
              </div>
              <div className={styles["dataScreen-main-chart"]}>
                <MaleFemaleRatioChart />
              </div>
            </div>
            <div className={styles["dataScreen-bottom"]}>
              <div className={styles["dataScreen-main-title"]}>
                <span className={styles["span"]}>年龄比例</span>
                <img className={styles["img"]} src={dataScreenTitle} alt="" />
              </div>
              <div className={styles["dataScreen-main-chart"]}>
                <AgeRatioChart />
              </div>
            </div>
          </div>
          <div className={styles["dataScreen-ct"]}>
            <div className={styles["dataScreen-map"]}>
              <div className={styles["dataScreen-map-title"]}>
                景区实时客流量
              </div>
              <ChinaMapChart />
            </div>
            <div className={styles["dataScreen-cb"]}>
              <div className={styles["dataScreen-main-title"]}>
                <span className={styles["span"]}>未来30天游客量趋势图</span>
                <img className={styles["img"]} src={dataScreenTitle} alt="" />
              </div>
              <div className={styles["dataScreen-main-chart"]}>
                <OverNext30Chart />
              </div>
            </div>
          </div>
          <div className={styles["dataScreen-rg"]}>
            <div className={styles["dataScreen-top"]}>
              <div className={styles["dataScreen-main-title"]}>
                <span className={styles["span"]}>热门景区排行</span>
                <img className={styles["img"]} src={dataScreenTitle} alt="" />
              </div>
              <div className={styles["dataScreen-main-chart"]}>
                <HotPlateChart />
              </div>
            </div>
            <div className={styles["dataScreen-center"]}>
              <div className={styles["dataScreen-main-title"]}>
                <span className={styles["span"]}>年度游客量对比</span>
                <img className={styles["img"]} src={dataScreenTitle} alt="" />
              </div>
              <div className={styles["dataScreen-main-chart"]}>
                <AnnualUseChart />
              </div>
            </div>
            <div className={styles["dataScreen-bottom"]}>
              <div className={styles["dataScreen-main-title"]}>
                <span className={styles["span"]}>预约渠道数据统计</span>
                <img className={styles["img"]} src={dataScreenTitle} alt="" />
              </div>
              <div className={styles["dataScreen-main-chart"]}>
                <PlatformSourceChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataScreen;
