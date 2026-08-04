# muvluvgg-translation

Simplified Chinese translation for Muvluv Girls Garden

## MasterData

路径在 `static/zh_Hans.json`

按照masterdata中的类和属性名组织，原`titles`中的翻译已经可以并入MasterData，无需再维护

```
{
    "_comment": "MasterData 静态翻译映射配置。tables 的键直接对应 MasterData 中的类名，字段名直接对应该类的 string 属性。部分属性类型不为字符串而是封装类，则用::来取封装类的 string 属性，如果为封装类数组则加上[]::，支持嵌套",
    "_flat_types": "非 MasterData 的扁平静态资源，按 translations/<type>/zh_Hans.json 加载",
    "flat_types": ["names"],
    "tables": {
        "ActuatorMaster": {
            "TabName": true,
            "FullName": true,
            "Description": true
        },
        "ChapterGroupMaster": {
            "Title": true,
            "SubTitle": true,
            "Description": true
        },
        "ChapterMaster": {
            "Title": true,
            "SubTitle": true,
            "Overview": true,
            "Interlude": true
        },
        "CharacterBaseMaster": {
            "Name": true,
            "NameRuby": true,
            "Hobby": true,
            "Description": true,
            "BirthPlace": true,
            "Favorite": true
        },
        "CharacterCockpitMotionMaster": {
            "Name": true
        },
        "CharacterEmotionMaster": {
            "Name": true
        },
        "CharacterMaster": {
            "Name": true
        },
        "CharacterSchoolGroupMaster": {
            "Name": true
        },
        "CharacterSchoolMaster": {
            "Name": true
        },
        "CharacterTeamMaster": {
            "Name": true,
            "Description": true
        },
        "CharacterVoiceMaster": {
            "Name": true
        },
        "CircleBattleBossMaster": {
            "Name": true
        },
        "EnemyMaster": {
            "Name": true
        },
        "EpisodeMaster": {
            "Title": true,
            "SubTitle": true
        },
        "EventGroupMaster": {
            "Name": true
        },
        "EventMaster": {
            "Name": true
        },
        "ExchangeMaster": {
            "Name": true
        },
        "GachaMaster": {
            "Name": true,
            "Description": true
        },
        "GradualMissionGroupMaster": {
            "Title": true
        },
        "HomeBackgroundMaster": {
            "Name": true
        },
        "HomeSoundtrackMaster": {
            "Name": true
        },
        "HomeSpeechMaster": {
            "Speech": true
        },
        "InboxMessageMaster": {
            "Message": true
        },
        "ItemAcquisitionLocationMaster": {
            "Location": true
        },
        "ItemMaster": {
            "Name": true,
            "Description": true
        },
        "LocationMaster": {
            "Name": true
        },
        "LocationNodeMaster": {
            "Name": true
        },
        "LoginBonusMaster": {
            "Name": true
        },
        "MazeBonusMaster": {
            "Name": true,
            "Description": true
        },
        "MazeGuarderMaster": {
            "Affiliation": true,
            "Identification": true,
            "Name": true,
            "Description": true
        },
        "MazeMaster": {
            "Name": true
        },
        "MazeMissionStageMaster": {
            "Name": true,
            "Description": true
        },
        "MazeTuneupDailyLimitGroupMaster": {
            "Name": true
        },
        "MemoryMaster": {
            "Name": true,
            "Description": true
        },
        "MgBattleRankMaster": {
            "Name": true
        },
        "MissionCategoryMaster": {
            "NotificationTitle": true
        },
        "MissionMaster": {
            "Title": true,
            "Description": true
        },
        "MissionStageMaster": {
            "Description": true
        },
        "ModuleGearMaster": {
            "Title": true
        },
        "ModuleMaster": {
            "Name": true
        },
        "OperatingSystemMaster": {
            "Name": true,
            "Description": true
        },
        "OverrideLocationNodeMaster": {
            "Name": true
        },
        "PartyBonusDetailMaster": {
            "Description": true,
            "EffectText": true
        },
        "PerkMaster": {
            "Description": true
        },
        "SceneBranchSelectionMaster": {
            "Answer": true
        },
        "SceneMaster": {
            "Title": true
        },
        "SdCharacterMaster": {
            "Name": true
        },
        "ShopProductMaster": {
            "Name": true,
            "Description": true
        },
        "SimulationMaster": {
            "Name": true
        },
        "SkillMaster": {
            "Name": true,
            "DescriptionTemplates[]::Template": true
        },
        "SnsAccountMaster": {
            "DisplayName": true
        },
        "SnsPostBranchSelectionMaster": {
            "Message": true
        },
        "SnsPostMaster": {
            "Message": true
        },
        "SpoilerAlertMaster": {
            "Text": true
        },
        "SpotAreaMaster": {
            "Name": true,
            "Description": true
        },
        "SpotAreaPointMaster": {
            "Name": true
        },
        "SubscriptionMaster": {
            "Name": true
        },
        "SubscriptionRewardMaster": {
            "Name": true,
            "Description": true
        },
        "TalkMaster": {
            "Title": true
        },
        "TalkMessageMaster": {
            "Message": true
        },
        "ThumbnailFrameMaster": {
            "Name": true,
            "Description": true
        },
        "TrophyMaster": {
            "Name": true,
            "UnlockDescription": true,
            "FlavorText": true
        },
        "TypeEquipmentMaster": {
            "Name": true,
            "Description": true
        },
        "UnlockFunctionMaster": {
            "Name": true,
            "Description": true
        },
        "UnlockFunctionTriggerMaster": {
            "Description": true
        },
        "WorldGroupMaster": {
            "Name": true
        },
        "WorldMaster": {
            "Name": true
        }
    }
}
```
