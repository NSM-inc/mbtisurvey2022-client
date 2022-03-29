export default interface EtcDto {
    leagueOfLegendsPosition: 'TOP' | 'JUNGLE' | 'MIDDLE' | 'BOTTOM' | 'SUPPORT';
    // 리그오브레전드 포지션
    leagueOfLegendsTier:
        | 'CHALLENGER'
        | 'MASTER'
        | 'DIAMOND'
        | 'PLATINUM'
        | 'GOLD'
        | 'SILVER'
        | 'BRONZE'
        | 'IRON';
    // 리그오브레전드 티어
    starcraftRace: 'TERRAN' | 'PROTOSS' | 'ZERG';
    // 스타크래프트 종족
    favoriteMbti:
        | null
        | ''
        | 'INTJ'
        | 'ENTJ'
        | 'ISFP'
        | 'ESFP'
        | 'INTP'
        | 'ENTP'
        | 'INFJ'
        | 'ENFJ'
        | 'ISTJ'
        | 'ESTJ'
        | 'ISFJ'
        | 'ESFJ'
        | 'ISTP'
        | 'ESTP'
        | 'INFP'
        | 'ENFP';
    // 선호 MBTI 유형
}
