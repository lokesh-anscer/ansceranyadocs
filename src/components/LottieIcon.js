import React, { useEffect, useRef } from "react";
import move from "./lotties/move";
import waypointMove from "./lotties/waypointMove";
import charging from "./lotties/charging";
import waitUser from "./lotties/waitUser";
import buzzer from "./lotties/buzzer";
import conveyor from "./lotties/conveyor";
import lifter from "./lotties/lifter";
import missionTarget from "./lotties/missionTarget";
import manipulator from "./lotties/manipulator";
import qrMarker from "./lotties/qrMarker";
import turnTable from "./lotties/turnTable";
import easyToManage from "./lotties/easyToManage";
import developerFriendly from "./lotties/developerFriendly";
import enhancedSafetyMeasures from "./lotties/enhancedSafetyMeasures";
import realTimeInsights from "./lotties/realTimeInsights";
import scalableSolution from "./lotties/scalableSolution";

const isBrowser = typeof window !== "undefined";

const LottiePlayer = ({ animationData, style = {}, height, width }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !isBrowser) {
      return undefined;
    }

    let animation;
    let cancelled = false;

    const loadAnimation = async () => {
      const { default: lottie } = await import("lottie-web");
      if (cancelled || !containerRef.current) {
        return;
      }
      animation = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData,
      });
    };

    loadAnimation();

    return () => {
      cancelled = true;
      if (animation) {
        animation.destroy();
      }
    };
  }, [animationData]);

  return (
    <div
      title="lottie-icon"
      style={{ height, width, ...style }}
      ref={containerRef}
    />
  );
};

const createIcon = (animationData, config = {}) => (
  <LottiePlayer animationData={animationData} {...config} />
);

const icons = {
  move: createIcon(move, {
    style: { margin: 0, marginBottom: "7px" },
    height: 75,
    width: 25,
  }),
  multiWaypoint: createIcon(waypointMove, {
    style: { margin: 0 },
    height: 45,
    width: 25,
  }),
  qrMarker: createIcon(qrMarker, {
    style: { margin: 0 },
    height: 23,
    width: 23,
  }),
  charging: createIcon(charging, {
    style: { margin: 0 },
    height: 75,
    width: 25,
  }),
  lifter: createIcon(lifter, {
    style: { margin: 0 },
    height: 40,
    width: 25,
  }),
  conveyor: createIcon(conveyor, {
    style: { margin: -5, marginTop: -15 },
    height: 40,
    width: 35,
  }),
  turnTable: createIcon(turnTable, {
    height: 30,
    width: 30,
  }),
  manipulator: createIcon(manipulator, {
    style: { margin: -2 },
    height: 35,
    width: 35,
  }),
  waitUser: createIcon(waitUser, {
    style: { margin: 0 },
    height: 35,
    width: 25,
  }),
  buzzer: createIcon(buzzer, {
    style: { margin: 0, marginBottom: "5px" },
    height: 25,
    width: 25,
  }),
  docking: createIcon(missionTarget, {
    style: { margin: 0 },
    height: 32,
    width: 25,
  }),
  undocking: createIcon(missionTarget, {
    style: { margin: 0 },
    height: 32,
    width: 25,
  }),
};
const featureIcons = {
  easyToManage: createIcon(easyToManage, {
    style: { margin: 0 },
    height: 50,
    width: 50,
  }),
  focusOnWhatMatters: createIcon(missionTarget, {
    style: { margin: 0 },
    height: 50,
    width: 50,
  }),
  developerFriendly: createIcon(developerFriendly, {
    style: { margin: 0 },
    height: 50,
    width: 50,
  }),
  enhancedSafetyMeasures: createIcon(enhancedSafetyMeasures, {
    style: { margin: 0 },
    height: 60,
    width: 60,
  }),
  realTimeInsights: createIcon(realTimeInsights, {
    style: { margin: 0 },
    height: 50,
    width: 50,
  }),
  scalableSolution: createIcon(scalableSolution, {
    style: { margin: 0 },
    height: 45,
    width: 45,
  }),
};
export const FeatureLottieIcon = ({ icon }) => featureIcons[icon];

export const MissionTaskChip = ({ icon, label }) => {
  return (
    <div className="task-chip">
      {icons[icon]}
      <h5 className="lottie-icon-label">{label}</h5>
      <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">
        <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
      </svg>
    </div>
  );
};
export const MissionTaskList = ({ icon, label, data }) => {
  return (
    <div className="task-list">
      {icons[icon]}
      <h5 className="lottie-icon-label">{label}</h5>
      <hr />
      <div className="data">
        {data ? (
          <h5 className="lottie-icon-label">{data}</h5>
        ) : (
          <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path>
          </svg>
        )}
      </div>
      <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">
        <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
      </svg>
    </div>
  );
};

const LottieIconWithLabel = ({ icon, label }) => {
  return (
    <div className="lottie-title-wrapper">
      {icons[icon]}
      <h1 className="lottie-icon-label">{label}</h1>
    </div>
  );
};
export default LottieIconWithLabel;
