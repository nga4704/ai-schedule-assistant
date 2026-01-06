// tasks/[id].tsx
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { Colors } from "../constants/colors";
import { deleteTask, getTaskById, updateTask } from "../services/taskService";
import { Task } from "../types/task";

export default function TaskDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();

    const [loading, setLoading] = useState(true);
    const [task, setTask] = useState<Task | null>(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        async function load() {
            const t = await getTaskById(id as string);

            if (!t) {
                setLoading(false);
                return;
            }

            setTask(t);
            setTitle(t.title);
            setDescription(t.description ?? "");
            setLoading(false);
        }

        load();
    }, [id]);

    if (loading) return <Text>Đang tải...</Text>;
    if (!task) return <Text>Không tìm thấy công việc</Text>;

    async function handleSave() {
        await updateTask(id, {
            title,
            description,
        });

        Alert.alert("OK", "Đã lưu thay đổi");
        router.back();
    }

    async function handleDelete() {
        Alert.alert("Xóa?", "Bạn chắc chắn muốn xóa?", [
            { text: "Huỷ" },
            {
                text: "Xóa",
                style: "destructive",
                onPress: async () => {
                    await deleteTask(id);
                    router.back();
                },
            },
        ]);
    }

    return (
        <ScrollView style={{ padding: 20 }}>
            <Text style={{ fontWeight: "700" }}>Tiêu đề</Text>
            <TextInput
                value={title}
                onChangeText={setTitle}
                style={{ backgroundColor: Colors.card, padding: 14, borderRadius: 12 }}
            />

            <Text style={{ fontWeight: "700", marginTop: 14 }}>Mô tả</Text>
            <TextInput
                value={description}
                onChangeText={setDescription}
                multiline
                style={{ backgroundColor: Colors.card, padding: 14, borderRadius: 12, height: 100 }}
            />

            <TouchableOpacity
                style={{ backgroundColor: Colors.primary, padding: 16, borderRadius: 16, marginTop: 24 }}
                onPress={handleSave}
            >
                <Text style={{ textAlign: "center", fontWeight: "800" }}>Lưu thay đổi</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{ padding: 16, borderRadius: 16, marginTop: 12, backgroundColor: "#ffdddd" }}
                onPress={handleDelete}
            >
                <Text style={{ textAlign: "center", fontWeight: "800", color: "red" }}>Xóa công việc</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
