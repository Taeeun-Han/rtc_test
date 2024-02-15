$(document).ready(function() {
  let mediaRecorder;
  let audioChunks = [];
  // 녹음 시작 버튼 클릭 이벤트
  $('#startRecord').click(function() {
      navigator.mediaDevices.getUserMedia({ audio: true })
          .then(stream => {
              mediaRecorder = new MediaRecorder(stream);
              mediaRecorder.start();
              mediaRecorder.ondataavailable = event => {
                  audioChunks.push(event.data);
              };
              mediaRecorder.onstop = () => {
                  const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                  const audioUrl = URL.createObjectURL(audioBlob);
                  $('#audioPlayback').attr('src', audioUrl);
                  audioChunks = [];
              };
              $('#startRecord').prop('disabled', true);
              $('#stopRecord').prop('disabled', false);
          })
          .catch(error => console.error("오디오 녹음에 실패했습니다.", error));
  });
  // 녹음 중지 버튼 클릭 이벤트
  $('#stopRecord').click(function() {
      mediaRecorder.stop();
      $('#startRecord').prop('disabled', false);
      $('#stopRecord').prop('disabled', true);
  });
});