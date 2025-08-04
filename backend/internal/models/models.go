package models

type Employee struct {
    ID   int    `json:"id"`
    Name string `json:"name"`
}

type Comparison struct {
    WinnerID int `json:"winner_id"`
    LoserID  int `json:"loser_id"`
}

type RankingRequest struct {
    Employees   []Employee   `json:"employees"`
    Comparisons []Comparison `json:"comparisons"`
}
