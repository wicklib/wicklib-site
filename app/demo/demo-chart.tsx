"use client";

import { useEffect, useRef, useState } from "react";
import {
  CandlestickSeries,
  DarkTheme,
  LightTheme,
  createChart,
  type ChartApi,
  type ChartOverlayApi,
  type OhlcData,
} from "@wicklib/core";

const MINUTE = 60_000;

function makeBars(): OhlcData[] {
  let price = 100;
  return Array.from({ length: 260 }, (_, index) => {
    const open = price;
    const change = Math.sin(index / 9) * 1.8 + Math.cos(index / 23) * 0.9;
    const close = Math.max(1, open + change);
    const high = Math.max(open, close) + 1.2 + Math.abs(Math.sin(index / 5));
    const low = Math.min(open, close) - 1.2 - Math.abs(Math.cos(index / 7));
    price = close;
    return { time: index * MINUTE, open, high, low, close, volume: 100 + (index % 60) };
  });
}

export function DemoChart() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<ChartApi | null>(null);
  const overlayRef = useRef<ChartOverlayApi | null>(null);
  const logoRef = useRef<HTMLImageElement | null>(null);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const chart = createChart(container, {
      autoSize: true,
      ...DarkTheme,
      crosshair: { ...DarkTheme.crosshair, mode: "magnet" },
      timeScale: { rightOffset: 4, maxVisibleBars: 900 },
    });
    chartRef.current = chart;

    const logo = new Image();
    const setLogo = (source: string): void => {
      logo.onload = () => overlayRef.current?.requestRender();
      logo.src = source;
    };
    logoRef.current = logo;
    setLogo("/brand/wicklib-logo-dark.svg");

    const overlay = chart.addOverlay({
      id: "wicklib-watermark",
      draw(context, frame) {
        const image = logoRef.current;
        if (!image || !image.complete || image.naturalWidth === 0) {
          return;
        }
        const width = 44;
        const height = width * (image.naturalHeight / image.naturalWidth);
        context.save();
        context.globalAlpha = 0.5;
        context.drawImage(
          image,
          frame.plot.left + 14,
          frame.plot.bottom - height - 14,
          width,
          height,
        );
        context.restore();
      },
    });
    overlayRef.current = overlay;

    const bars = makeBars();
    const series = chart.addSeries(CandlestickSeries, { title: "WICK/USD" });
    series.setData(bars);
    series.createPriceLine({
      price: 120,
      color: "#10b981",
      lineStyle: "dashed",
      title: "Entry",
      titlePosition: "plot",
    });
    series.createPriceLine({
      price: 145,
      color: "#f43f5e",
      lineStyle: "dotted",
      title: "Target",
      titlePosition: "plot",
    });
    series.setMarkers([
      {
        time: bars[40]!.time,
        position: "belowBar",
        shape: "arrowUp",
        color: "#10b981",
        text: "Buy",
      },
      {
        time: bars[180]!.time,
        position: "aboveBar",
        shape: "arrowDown",
        color: "#f43f5e",
        text: "Exit",
      },
    ]);
    chart.timeScale().fitContent();

    return () => {
      chartRef.current = null;
      overlayRef.current = null;
      logoRef.current = null;
      chart.destroy();
    };
  }, []);

  useEffect(() => {
    chartRef.current?.setOptions({
      ...(dark ? DarkTheme : LightTheme),
      crosshair: { ...(dark ? DarkTheme : LightTheme).crosshair, mode: "magnet" },
    });
    const logo = logoRef.current;
    if (logo) {
      logo.onload = () => overlayRef.current?.requestRender();
      logo.src = dark ? "/brand/wicklib-logo-dark.svg" : "/brand/wicklib-logo-light.svg";
    }
  }, [dark]);

  return (
    <div className="mt-8 overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
        <span className="text-xs text-neutral-500">WICK/USD · 1m · 260 bars</span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setDark((value) => !value)}
            className="rounded-md border border-neutral-300 px-3 py-1.5 text-xs hover:border-neutral-950 dark:border-neutral-700 dark:hover:border-white"
          >
            {dark ? "Light" : "Dark"} theme
          </button>
          <button
            type="button"
            onClick={() => chartRef.current?.timeScale().fitContent()}
            className="rounded-md border border-neutral-300 px-3 py-1.5 text-xs hover:border-neutral-950 dark:border-neutral-700 dark:hover:border-white"
          >
            Fit
          </button>
          <button
            type="button"
            onClick={() => {
              const chart = chartRef.current;
              if (!chart) return;
              const link = document.createElement("a");
              link.download = "wicklib-demo.png";
              link.href = chart.exportImage("image/png");
              link.click();
            }}
            className="rounded-md bg-neutral-950 px-3 py-1.5 text-xs font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
          >
            PNG
          </button>
        </div>
      </div>
      <div ref={containerRef} className="h-[520px] w-full" />
    </div>
  );
}
