import React, { useEffect, useRef, useState } from 'react';
import rrweb from 'rrweb';
import Dexie from 'dexie';

const db = new Dexie('rrweb');
db.version(1).stores({
  events: '&time',
});

const IndexPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let recorder: rrweb.RecordHandler | null = null;
    let events: rrweb.Event[] = [];

    if (isRecording) {
      // 开始录制
      recorder = new rrweb.RecordHandler({
        emit(event) {
          events.push(event);
        },
      });
      recorder.start();
    } else {
      // 停止录制
      if (recorder) {
        recorder.stop();
        recorder = null;
        // 将录制数据存储到indexDB中
        db.events.bulkAdd(events);
        events = [];
      }
    }
  }, [isRecording]);

  useEffect(() => {
    // 读取indexDB中的数据，并回放
    db.events.toArray().then((events) => {
      const replayer = new rrweb.Replayer(events);
      replayer.play(playerRef.current!);
    });
  }, []);

  return (
    <div>
      <div ref={playerRef}></div>
      <button onClick={() => setIsRecording(!isRecording)}>
        {isRecording ? '停止录制' : '开始录制'}
      </button>
    </div>
  );
};

export default IndexPage;