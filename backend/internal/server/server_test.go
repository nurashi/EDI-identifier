package server

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
)

func TestHealthz(t *testing.T) {
	gin.SetMode(gin.TestMode)
	w := httptest.NewRecorder()
	New().ServeHTTP(w, httptest.NewRequest(http.MethodGet, "/healthz", nil))

	if w.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", w.Code, http.StatusOK)
	}
	if got, want := w.Body.String(), `{"status":"ok"}`; got != want {
		t.Fatalf("body = %s, want %s", got, want)
	}
}
